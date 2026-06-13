package com.devlop3.sports_api.dto;

import lombok.Data;

@Data
public class TeamWrapperDTO {
    private TeamDTO home;
    private TeamDTO away;
}
