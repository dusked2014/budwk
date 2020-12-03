package com.budwk.nb.sys.services.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.budwk.nb.commons.base.service.BaseServiceImpl;
import com.budwk.nb.sys.models.Sys_menu;
import com.budwk.nb.sys.services.SysMenuService;
import com.budwk.nb.sys.services.SysRoleService;
import org.nutz.aop.interceptor.async.Async;
import org.nutz.aop.interceptor.ioc.TransAop;
import org.nutz.dao.Chain;
import org.nutz.dao.Cnd;
import org.nutz.dao.Dao;
import org.nutz.dao.Sqls;
import org.nutz.ioc.aop.Aop;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.Strings;
import org.nutz.lang.util.NutMap;
import org.nutz.plugins.wkcache.annotation.CacheDefaults;
import org.nutz.plugins.wkcache.annotation.CacheRemoveAll;
import org.nutz.plugins.wkcache.annotation.CacheResult;

import java.util.ArrayList;
import java.util.List;

import static com.budwk.nb.commons.constants.RedisConstant.PLATFORM_REDIS_WKCACHE_PREFIX;

/**
 * @author wizzer(wizzer@qq.com) on 2016/12/22.
 */
@IocBean(args = {"refer:dao"})
@Service(interfaceClass = SysMenuService.class)
@CacheDefaults(cacheName = PLATFORM_REDIS_WKCACHE_PREFIX + "sys_menu")
public class SysMenuServiceImpl extends BaseServiceImpl<Sys_menu> implements SysMenuService {
    public SysMenuServiceImpl(Dao dao) {
        super(dao);
    }

    @Inject
    private SysRoleService sysRoleService;

    /**
     * 新增菜单
     *
     * @param menu
     * @param pid
     */
    @Override
    @Aop(TransAop.READ_COMMITTED)
    public void save(Sys_menu menu, String pid, List<NutMap> datas) {
        String path = "";
        if (!Strings.isEmpty(pid)) {
            Sys_menu pp = this.fetch(pid);
            path = pp.getPath();
        } else {
            pid = "";
        }
        menu.setPath(getSubPath(this.getEntity().getTableName(), "path", path));
        menu.setParentId(pid);
        dao().insert(menu);
        if (!Strings.isEmpty(pid) && "menu".equals(menu.getType())) {
            this.update(Chain.make("hasChildren", true), Cnd.where("id", "=", pid));
        }
        if (datas != null) {
            for (NutMap map : datas) {
                Sys_menu m = new Sys_menu();
                m.setParentId(menu.getId());
                m.setHasChildren(false);
                m.setShowit(false);
                m.setLocation(0);
                m.setType("data");
                m.setPermission(map.getString("permission", ""));
                m.setAlias(m.getPermission());
                m.setName(map.getString("name", ""));
                m.setPath(getSubPath(this.getEntity().getTableName(), "path", menu.getPath()));
                m.setCreatedBy(menu.getCreatedBy());
                m.setUpdatedBy(menu.getUpdatedBy());
                if (Strings.isNotBlank(m.getPermission())) {
                    this.insert(m);
                }
            }
        }
    }

    /**
     * 编辑菜单
     *
     * @param menu
     * @param pid
     */
    @Override
    @Aop(TransAop.READ_COMMITTED)
    public void edit(Sys_menu menu, String pid, List<NutMap> datas) {
        if (this.count(Cnd.where("parentId", "=", menu.getId()).and("type","=","menu")) > 0) {
            menu.setHasChildren(true);
        }
        this.updateIgnoreNull(menu);
        if (datas == null || datas.size() == 0) {
            //如果子权限是空,那就清空咯
            this.clear(Cnd.where("type", "=", "data").and("parentId", "=", menu.getId()));
        } else {
            List<String> notInIds = new ArrayList<>();
            for (NutMap map : datas) {
                String id = map.getString("key", "");
                Sys_menu d = this.fetch(id);
                if (d != null) {
                    d.setPermission(map.getString("permission", ""));
                    d.setAlias(d.getPermission());
                    d.setName(map.getString("name", ""));
                    this.updateIgnoreNull(d);
                    notInIds.add(d.getId());
                } else {
                    Sys_menu m = new Sys_menu();
                    m.setParentId(menu.getId());
                    m.setHasChildren(false);
                    m.setShowit(false);
                    m.setLocation(0);
                    m.setType("data");
                    m.setPermission(map.getString("permission", ""));
                    m.setAlias(m.getPermission());
                    m.setName(map.getString("name", ""));
                    m.setPath(getSubPath("sys_menu", "path", menu.getPath()));
                    m.setCreatedBy(menu.getCreatedBy());
                    m.setUpdatedBy(menu.getUpdatedBy());
                    if (Strings.isNotBlank(m.getPermission())) {
                        this.insert(m);
                    }
                    notInIds.add(m.getId());
                }
            }
            if (notInIds.size() > 0) {
                //删除不在提交表单里的权限数据,注意查询条件,别把子菜单给删了
                this.clear(Cnd.where("id", "not in", notInIds).and("type", "=", "data").and("parentId", "=", menu.getId()));
            }
        }
    }

    /**
     * 级联删除菜单
     *
     * @param menu
     */
    @Override
    @Aop(TransAop.READ_COMMITTED)
    public void deleteAndChild(Sys_menu menu) {
        dao().execute(Sqls.create("delete from sys_menu where path like @path").setParam("path", menu.getPath() + "%"));
        dao().execute(Sqls.create("delete from sys_role_menu where menuId=@id or menuId in(SELECT id FROM sys_menu WHERE path like @path)").setParam("id", menu.getId()).setParam("path", menu.getPath() + "%"));
        if (!Strings.isEmpty(menu.getParentId())) {
            int count = count(Cnd.where("parentId", "=", menu.getParentId()));
            if (count < 1) {
                dao().execute(Sqls.create("update sys_menu set hasChildren=false where id=@pid").setParam("pid", menu.getParentId()));
            }
        }
    }

    @Override
    @CacheResult
    public Sys_menu getLeftMenu(String href) {
        return this.fetch(Cnd.where("href", "=", href));
    }

    @Override
    @CacheResult
    public Sys_menu getLeftPathMenu(List<String> list) {
        return this.fetch(Cnd.where("href", "in", list).desc("href").desc("path"));
    }


    @Override
    @CacheRemoveAll
    @Async
    public void clearCache() {
        sysRoleService.clearCache();
    }
}
