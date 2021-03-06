package com.budwk.nb.commons.utils;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.nutz.lang.Times;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * @author wizzer(wizzer@qq.com) on 2016/6/24.
 */
public class DateUtil {
    private static final Locale DEFAULT_LOCALE = Locale.CHINA;
    private static final SimpleDateFormat YYYY_MM_DD_HH_MM_SS = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    public static final SimpleDateFormat DATE_TIME_ZONE = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssXXX");

    /**
     * 获取当前时间(HH:mm:ss)
     *
     * @return
     */
    public static String getDate() {
        return DateFormatUtils.format(new Date(), "yyyy-MM-dd", DEFAULT_LOCALE);
    }

    /**
     * 获取当前时间(HH:mm:ss)
     *
     * @return
     */
    public static String getTime() {
        return DateFormatUtils.format(new Date(), "HH:mm:ss", DEFAULT_LOCALE);
    }

    /**
     * 获取当前时间(yyyy-MM-dd HH:mm:ss)
     *
     * @return
     */
    public static String getDateTime() {
        return DateFormatUtils.format(new Date(), "yyyy-MM-dd HH:mm:ss", DEFAULT_LOCALE);
    }

    /**
     * 转换日期格式(yyyy-MM-dd HH:mm:ss)
     *
     * @param date
     * @return
     */
    public static String formatDateTime(Date date) {
        if (date == null) {
            return "";
        }
        return DateFormatUtils.format(date, "yyyy-MM-dd HH:mm:ss", DEFAULT_LOCALE);
    }

    /**
     * 转换日期格式(yyyy-MM-dd HH:mm:ss)
     *
     * @param date
     * @param f
     * @return
     */
    public static String format(Date date, String f) {
        if (date == null) {
            return "";
        }
        return DateFormatUtils.format(date, f, DEFAULT_LOCALE);
    }

    /**
     * 时间戳日期
     *
     * @param time
     * @return
     */
    public static String getDate(long time) {
        return DateFormatUtils.format(new Date(time * 1000), "yyyy-MM-dd HH:mm:ss", DEFAULT_LOCALE);
    }

    /**
     * 时间戳日期
     *
     * @param time
     * @param f
     * @return
     */
    public static String getDate(long time, String f) {
        return DateFormatUtils.format(new Date(time * 1000), f, DEFAULT_LOCALE);
    }

    /**
     * 通过字符串时间获取时间戳 budwk v6 时间戳不除以1000
     *
     * @param date
     * @return
     */
    public static long getTime(String date) {
        try {
            return Times.parse(YYYY_MM_DD_HH_MM_SS, date).getTime();
        } catch (ParseException e) {
            return 0;
        }
    }

    /**
     * 通过字符串时间获取时间戳 budwk v6 时间戳不除以1000
     *
     * @param date
     * @return
     */
    public static long getTime(SimpleDateFormat sdf, String date) {
        try {
            return Times.parse(sdf, date).getTime();
        } catch (ParseException e) {
            return 0;
        }
    }

    /**
     * 获取间隔N分钟之后的时间
     *
     * @param date
     * @param minute
     * @return
     */
    public static String getDateAfterMinute(Date date, int minute) {
        long newTime = date.getTime() + minute * 60 * 1000;
        return Times.format(DATE_TIME_ZONE, new Date(newTime));
    }
}
