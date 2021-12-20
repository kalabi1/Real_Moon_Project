package com.nahalit.nahalapimanager.dao;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class RL1003Dao {
  private final NamedParameterJdbcTemplate db;


  public RL1003Dao(NamedParameterJdbcTemplate db) {
    this.db = db;
  }

  public List getAllProjectRef(Long projectNo) {

    StringBuilder sql = new StringBuilder();

    sql.append(" SELECT  P.PROJECT_NO \"projectNo\",");
    sql.append(" P.PROJECT_ID \"projectId\",");
    sql.append(" P.PROJECT_NAME \"projectName\",");
    sql.append(" P.PROJECT_TYPE \"projectType\",");
    sql.append(" P.DESCR \"descr\",");
    sql.append(" P.APPROVAL_NO \"approvalNo\",");
    sql.append(" P.PROJECT_LOCATION \"projectLocation\",");
    sql.append(" P.PLOT_SIZE \"plotSize\",");
    sql.append(" P.BLOCK_NAME_FROM \"blockNameFrom\",");
    sql.append(" P.BLOCK_NAME_TO \"blockNameTo\",");
    sql.append(" P.LAND_AREA \"landArea\",");
    sql.append(" P.NO_OF_STORIED \"noOfStoried\",");
    sql.append(" P.NO_OF_LIFT \"noOfLift\",");
    sql.append(" P.FACING_NO \"facingNo\",");
    sql.append(" P.NO_OF_FLAT \"noOfFlat\",");
    sql.append(" P.CAR_PARKING \"carParking\",");
    sql.append(" P.HAND_OVER_TIME \"handOverTime\",");
    sql.append(" P.OPEN_SPACE \"openSpace\",");
    sql.append(" P.SS_CREATED_ON \"ssCreatedOn\",");
    sql.append(" P.SS_CREATOR \"ssCreator\",");
    sql.append(" P.SS_MODIFIED_ON \"ssModifiedOn\",");
    sql.append(" P.SS_MODIFIER \"ssModifier\",");
    sql.append(" P.ROAD_SIZE_NO \"roadSizeNo\",");
    sql.append(" P.PROJECT_TYPE_NO \"projectTypeNo\",");
    sql.append(" P.PROJECT_LAYOUT_PHOTO \"projectLayoutPhoto\",");
    sql.append(" A.APPROVAL_ID \"approvalId\"");
    sql.append(" FROM RL_PROJECT P,RL_RAJUK_APPROVAL A");
    sql.append(" WHERE P.APPROVAL_NO=A.APPROVAL_NO(+)");
    sql.append(" AND P.PROJECT_TYPE_NO=2");
    sql.append(" AND P.PROJECT_NO=NVL(:PROJECT_NO,P.PROJECT_NO)");

    Map<String, Long> params = new HashMap<>();
    params.put("PROJECT_NO", projectNo);

    return db.queryForList(sql.toString(), params);
  }

  public Object getProjectRef(Long projectNo) {

    StringBuilder sql = new StringBuilder();

    sql.append(" SELECT  P.PROJECT_NO \"projectNo\",");
    sql.append(" P.PROJECT_ID \"projectId\",");
    sql.append(" P.PROJECT_NAME \"projectName\",");
    sql.append(" P.PROJECT_TYPE \"projectType\",");
    sql.append(" P.DESCR \"descr\",");
    sql.append(" P.APPROVAL_NO \"approvalNo\",");
    sql.append(" P.PROJECT_LOCATION \"projectLocation\",");
    sql.append(" P.PLOT_SIZE \"plotSize\",");
    sql.append(" P.BLOCK_NAME_FROM \"blockNameFrom\",");
    sql.append(" P.BLOCK_NAME_TO \"blockNameTo\",");
    sql.append(" P.LAND_AREA \"landArea\",");
    sql.append(" P.NO_OF_STORIED \"noOfStoried\",");
    sql.append(" P.NO_OF_LIFT \"noOfLift\",");
    sql.append(" P.FACING_NO \"facingNo\",");
    sql.append(" P.NO_OF_FLAT \"noOfFlat\",");
    sql.append(" P.CAR_PARKING \"carParking\",");
    sql.append(" P.HAND_OVER_TIME \"handOverTime\",");
    sql.append(" P.OPEN_SPACE \"openSpace\",");
    sql.append(" P.SS_CREATED_ON \"ssCreatedOn\",");
    sql.append(" P.SS_CREATOR \"ssCreator\",");
    sql.append(" P.SS_MODIFIED_ON \"ssModifiedOn\",");
    sql.append(" P.SS_MODIFIER \"ssModifier\",");
    sql.append(" P.ROAD_SIZE_NO \"roadSizeNo\",");
    sql.append(" P.PROJECT_LAYOUT_PHOTO \"projectLayoutPhoto\",");
    sql.append(" P.PROJECT_TYPE_NO \"projectTypeNo\",");
    sql.append(" A.APPROVAL_ID \"approvalId\"");
    sql.append(" FROM RL_PROJECT P,RL_RAJUK_APPROVAL A");
    sql.append(" WHERE P.APPROVAL_NO=A.APPROVAL_NO(+)");
    sql.append(" AND P.PROJECT_TYPE_NO=2");
    sql.append(" AND P.PROJECT_NO=(:PROJECT_NO)");

    Map<String, Long> params = new HashMap<>();
    params.put("PROJECT_NO", projectNo);

    return db.queryForMap(sql.toString(), params);
  }

}
