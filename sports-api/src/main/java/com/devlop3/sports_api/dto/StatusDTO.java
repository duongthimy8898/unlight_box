package com.devlop3.sports_api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class StatusDTO {
    @JsonProperty("long")
    private String longStatus;

    @JsonProperty("short")
    private String shortStatus;

    private Integer elapsed;
    private Integer extra;
}
