package com.nahalit.nahalapimanager.utillibrary;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class UtillDate {
  public static String getNowTimeNameForFile() {
    LocalDateTime now = LocalDateTime.now();
    DateTimeFormatter format = DateTimeFormatter.ofPattern("ddMMyyHHmmss");
    String formatDateTimeForFile = "file_" + now.format(format) + RandomString.randomAlphaNumeric(4);
    return formatDateTimeForFile;
  }

  public static String getNowTimeNameForImage() {
    LocalDateTime now = LocalDateTime.now();
    DateTimeFormatter format = DateTimeFormatter.ofPattern("ddMMyyHHmmss");
    String formatDateTimeForImage = "img_" + now.format(format) + RandomString.randomAlphaNumeric(4);
    return formatDateTimeForImage;
  }

  public static Date getDateTime() throws ParseException {
    LocalDateTime now = LocalDateTime.now();
    DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MMM-yyyy hh:mm:ss a");
    return new SimpleDateFormat("dd-MMM-yyyy hh:mm:ss a").parse(now.format(format));
  }

}
