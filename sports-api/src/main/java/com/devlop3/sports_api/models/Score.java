package com.devlop3.sports_api.models;

// import jakarta.annotation.Generated;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
// import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Score {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne
  @JoinColumn(name = "fixture_id")
  private Fixture fixture;

  @Embedded
  @AttributeOverrides({
      @AttributeOverride(name = "home", column = @Column(name = "halftime_home")),
      @AttributeOverride(name = "away", column = @Column(name = "halftime_away"))
  })
  private ScorePart halftime;

  @Embedded
  @AttributeOverrides({
      @AttributeOverride(name = "home", column = @Column(name = "fulltime_home")),
      @AttributeOverride(name = "away", column = @Column(name = "fulltime_away"))
  })
  private ScorePart fulltime;

  @Embedded
  @AttributeOverrides({
      @AttributeOverride(name = "home", column = @Column(name = "extratime_home")),
      @AttributeOverride(name = "away", column = @Column(name = "extratime_away"))
  })
  private ScorePart extratime;

  @Embedded
  @AttributeOverrides({
      @AttributeOverride(name = "home", column = @Column(name = "penalty_home")),
      @AttributeOverride(name = "away", column = @Column(name = "penalty_away"))
  })
  private ScorePart penalty;
}
