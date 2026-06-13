package com.devlop3.sports_api.dto;

import lombok.Data;

@Data
public class LeagueDTO {
    private Long id;
    private String name;
    private String country;
    private String logo;
    private String flag;
    private Integer season;
    private String round;
    private Boolean standings;
}
