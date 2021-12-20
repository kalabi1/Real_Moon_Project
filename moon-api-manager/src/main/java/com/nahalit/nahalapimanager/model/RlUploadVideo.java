package com.nahalit.nahalapimanager.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
@Getter
@Setter
@NoArgsConstructor
@Entity
public class RlUploadVideo {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rl_upload_video")
    @SequenceGenerator(sequenceName = "S_RL_UPLOAD_VIDEO", allocationSize = 1, name = "rl_upload_video")
    private Long videoNo;
    private String videoTitle;
    private String youtubeVideoLink;
    private Long itemNo;
    private Long projectNo;
    private Long ssCreator;
    private Date ssCreatedOn;
    private Long ssModifier;
    private Date ssModifiedOn;

}
