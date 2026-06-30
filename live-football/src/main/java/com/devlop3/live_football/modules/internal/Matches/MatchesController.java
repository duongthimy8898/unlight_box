package com.devlop3.live_football.modules.internal.Matches;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devlop3.live_football.common.models.InternalAccount;
import com.devlop3.live_football.common.models.Match;
import com.devlop3.live_football.common.services.InternalAccountService;
import com.devlop3.live_football.common.services.MatchService;
import com.devlop3.live_football.modules.internal.Matches.dto.AddMatchInput;
import com.devlop3.live_football.modules.internal.Matches.dto.MatchOutput;
import com.devlop3.live_football.modules.internal.Matches.dto.UpdateMatchInput;
import com.devlop3.live_football.modules.internal.Matches.utils.SlugGenerator;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController("internal.matchesController")
@RequestMapping(path = "/internal/api/matches", produces = "application/json")
public class MatchesController {

  @Autowired
  private MatchService matchService;

  @Autowired
  private InternalAccountService internalAccountService;


  @GetMapping("")
  public ResponseEntity<?> getAllMatches(
      @RequestParam(name = "isHot", defaultValue = "", required = false) String isHot,
      @RequestParam(name = "isPinned", defaultValue = "", required = false) String isPinned) {
    try {
      List<Match> matches = matchService.findAll();
      if (!Strings.isEmpty(isHot))
        matches = matches.stream().filter(m -> m.getIsHot().equals(Boolean.parseBoolean(isHot))).toList();
      if (!Strings.isEmpty(isPinned))
        matches = matches.stream().filter(m -> m.getIsPinned().equals(Boolean.parseBoolean(isPinned))).toList();

      List<MatchOutput> matchOutputs = matches.stream()
          .sorted(!Strings.isEmpty(isPinned)
              ? Comparator.comparing(Match::getUpdatedAt)
              : Comparator.comparing(Match::getStartTime))
          // 🛠 newest first
          .map(MatchOutput::new)
          .toList();

      return ResponseEntity.ok(Map.of("code", 200, "message", "Thành công", "data", matchOutputs));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.ok(Map.of("code", 500, "message", e.getMessage(), "error", e));
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getMatchById(@PathVariable(name = "id") Long id) {
    try {
      Optional<Match> matchOpt = matchService.findById(id);
      if (matchOpt.isEmpty())
        return ResponseEntity.ok(Map.of("code", 404, "message", "Trận không tồn tại"));
      MatchOutput matchOutput = matchOpt.map(m -> new MatchOutput(m)).get();
      return ResponseEntity.ok(Map.of("code", 200, "message", "Thành công", "data", matchOutput));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.ok(Map.of("code", 500, "message", e.getMessage(), "error", e));
    }
  }

  @PostMapping("/add")
  public ResponseEntity<?> postAddMatch(@Valid @RequestBody AddMatchInput addMatchInput) {
    try {
      Match newMatch = new Match();
      newMatch.setType(addMatchInput.getType());
      newMatch.setReferenceId(addMatchInput.getReferenceId());
      newMatch.setTitle(addMatchInput.getTitle());
      newMatch.setTournamentName(addMatchInput.getTournamentName());
      newMatch.setHomeClubName(addMatchInput.getHomeClubName());
      newMatch.setHomeClubLogoUrl(addMatchInput.getHomeClubLogoUrl());
      newMatch.setAwayClubName(addMatchInput.getAwayClubName());
      newMatch.setAwayClubLogoUrl(addMatchInput.getAwayClubLogoUrl());
      newMatch.setStartTime(addMatchInput.getStartTime());

      InternalAccount commentator = null;
      if (!Objects.isNull(addMatchInput.getCommentatorInternalAccountId())) {
        Optional<InternalAccount> commentatorOpt = internalAccountService
            .findById(addMatchInput.getCommentatorInternalAccountId());
        if (commentatorOpt.isEmpty() || !commentatorOpt.get().getRole().equals(InternalAccount.Role.COMMENTATOR))
          return ResponseEntity.ok(Map.of("code", 404, "message", "Bình luận viên không tồn tại"));
        commentator = commentatorOpt.orElse(null);
      }

      newMatch.setCommentator(commentator);

      newMatch.setArticleUrl(addMatchInput.getArticleUrl());
      newMatch.setIsHot(addMatchInput.getIsHot());
      newMatch.setIsPinned(addMatchInput.getIsPinned());
      newMatch.setCanonicalUrl(addMatchInput.getCanonicalUrl());
      newMatch.setRobotsMeta(addMatchInput.getRobotsMeta());
      newMatch.setMetaDescription(addMatchInput.getMetaDescription());
      newMatch.setSitemapUrl(addMatchInput.getSitemapUrl());
      newMatch.setKeywords(addMatchInput.getKeywords());
      newMatch.setSchemaMarkup(addMatchInput.getSchemaMarkup());
      newMatch.setOpenGraphMeta(addMatchInput.getOpenGraphMeta());
      newMatch.setFeaturedImageUrl(addMatchInput.getFeaturedImageUrl());
      newMatch.setTags(addMatchInput.getTags());
      newMatch.setAuthor(addMatchInput.getAuthor());
      newMatch.setOgTitle(addMatchInput.getOgTitle());
      newMatch.setOgDescription(addMatchInput.getOgDescription());
      newMatch.setOgImage(addMatchInput.getOgImage());
      newMatch.setOgUrl(addMatchInput.getOgUrl());
      newMatch.setSlug(SlugGenerator.generate(newMatch.getTitle()) + "-" + Instant.now().toEpochMilli());
      matchService.save(newMatch);
      return ResponseEntity.ok(Map.of("code", 201, "message", "Thành công", "data", newMatch));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.ok(Map.of("code", 500, "message", e.getMessage(), "error", e));
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> putMatchById(@PathVariable(name = "id") Long id,
      @RequestBody UpdateMatchInput updateMatchInput) {
    try {
      Optional<Match> matchOpt = matchService.findById(id);
      if (matchOpt.isEmpty())
        return ResponseEntity.ok(Map.of("code", 404, "message", "Trận không tồn tại"));
      Match match = matchOpt.get();
      match.setReferenceId(updateMatchInput.getReferenceId());
      match.setTitle(updateMatchInput.getTitle());
      match.setTournamentName(updateMatchInput.getTournamentName());
      match.setHomeClubName(updateMatchInput.getHomeClubName());
      match.setHomeClubLogoUrl(updateMatchInput.getHomeClubLogoUrl());
      match.setAwayClubName(updateMatchInput.getAwayClubName());
      match.setAwayClubLogoUrl(updateMatchInput.getAwayClubLogoUrl());

      match.setStartTime(updateMatchInput.getStartTime());

      InternalAccount commentator = match.getCommentator();
      if (!Objects.isNull(updateMatchInput.getCommentatorInternalAccountId())) {
        Optional<InternalAccount> commentatorOpt = internalAccountService
            .findById(updateMatchInput.getCommentatorInternalAccountId());
        if (commentatorOpt.isEmpty() || !commentatorOpt.get().getRole().equals(InternalAccount.Role.COMMENTATOR))
          return ResponseEntity.ok(Map.of("code", 404, "message", "Bình luận viên không tồn tại"));
        commentator = commentatorOpt.orElse(commentator);
      }

      match.setCommentator(commentator);

      match.setArticleUrl(updateMatchInput.getArticleUrl());
      // match.setIsHot(updateMatchInput.getIsHot());
      // match.setIsPinned(updateMatchInput.getIsPinned());
      match.setCanonicalUrl(updateMatchInput.getCanonicalUrl());
      match.setRobotsMeta(updateMatchInput.getRobotsMeta());
      match.setMetaDescription(updateMatchInput.getMetaDescription());
      match.setSitemapUrl(updateMatchInput.getSitemapUrl());
      match.setKeywords(updateMatchInput.getKeywords());
      match.setSchemaMarkup(updateMatchInput.getSchemaMarkup());
      match.setOpenGraphMeta(updateMatchInput.getOpenGraphMeta());
      match.setFeaturedImageUrl(updateMatchInput.getFeaturedImageUrl());
      match.setTags(updateMatchInput.getTags());
      match.setAuthor(updateMatchInput.getAuthor());
      match.setOgTitle(updateMatchInput.getOgTitle());
      match.setOgDescription(updateMatchInput.getOgDescription());
      match.setOgImage(updateMatchInput.getOgImage());
      match.setOgUrl(updateMatchInput.getOgUrl());
      match.setSlug(SlugGenerator.generate(match.getTitle()) + "-" + Instant.now().toEpochMilli());
      matchService.save(match);
      MatchOutput matchOutput = new MatchOutput(match);
      return ResponseEntity.ok(Map.of("code", 200, "message", "Thành công", "data", matchOutput));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.ok(Map.of("code", 500, "message", e.getMessage(), "error", e));
    }
  }

  @PutMapping("/{id}/actions")
  public ResponseEntity<?> putActionsMatchById(@PathVariable(name = "id") Long id,
      @RequestParam(name = "act", required = false) String act) {
    try {
      Optional<Match> matchOpt = matchService.findById(id);
      if (matchOpt.isEmpty())
        return ResponseEntity.ok(Map.of("code", 404, "message", "Trận không tồn tại"));
      Match match = matchOpt.get();
      switch (act) {
        case "pin":
          match.setIsPinned(true);
          break;
        case "unpin":
          match.setIsPinned(false);
          break;
        case "live":
          match.setIsLive(true);
          break;
        case "unlive":
          match.setIsLive(false);
          break;
        case "pin2":
          match.setIsHot(true);
          break;
        case "unpin2":
          match.setIsHot(false);
          break;
        default:
          break;
      }
      matchService.save(match);
      MatchOutput matchOutput = new MatchOutput(match);
      return ResponseEntity.ok(Map.of("code", 200, "message", "Thành công", "data", matchOutput));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.ok(Map.of("code", 500, "message", e.getMessage(), "error", e));
    }
  }

  @DeleteMapping("/{id}")
  @Transactional
  public ResponseEntity<?> deleteMatchById(@PathVariable(name = "id") Long id) {
    try {
      Optional<Match> matchOpt = matchService.findById(id);
      if (matchOpt.isEmpty())
        return ResponseEntity.ok(Map.of("code", 404, "message", "Trận không tồn tại"));

      Match match = matchOpt.get();

      // Gỡ liên kết 2 chiều cho an toàn
      InternalAccount commentator = match.getCommentator();
      if (commentator != null) {
        commentator.getMatchs().remove(match); // gỡ match khỏi list cha
        match.setCommentator(null);
      }

      matchService.delete(match);

      return ResponseEntity.ok(Map.of("code", 204, "message", "Thành công"));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.ok(Map.of("code", 500, "message", e.getMessage(), "error", e));
    }
  }

  
}
