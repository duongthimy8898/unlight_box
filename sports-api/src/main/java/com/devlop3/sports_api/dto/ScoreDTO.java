package com.devlop3.sports_api.dto;

import lombok.Data;

@Data
public class ScoreDTO {
    private ScorePartDTO halftime;
    private ScorePartDTO fulltime;
    private ScorePartDTO extratime;
    private ScorePartDTO penalty;
}
