package com.devlop3.live_football.modules.internal.Streams;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devlop3.live_football.common.models.Stream;
import com.devlop3.live_football.common.services.StreamService;
import com.devlop3.live_football.modules.internal.Streams.dto.StreamInput;

import jakarta.validation.Valid;

@RestController("internal.streamsController")
@RequestMapping(path = "/internal/api/streams", produces = "application/json")
public class StreamsController {

  @Autowired
  private StreamService streamService;

  @GetMapping("/{id}")
  public ResponseEntity<?> getStreamById(@PathVariable(name = "id") Long id) {
    try {
      Optional<Stream> streamOpt = streamService.findById(id);
      if (streamOpt.isEmpty())
        return ResponseEntity.ok(Map.of("code", 404, "message", "Luồng không tồn tại"));
      return ResponseEntity.ok(Map.of("code", 200, "message", "Thành công", "data", streamOpt.get()));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.ok(Map.of("code", 500, "message", e.getMessage(), "error", e));
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> putStreamById(@PathVariable(name = "id") Long id,
      @Valid @RequestBody StreamInput updateStreamInput) {
    try {
      Optional<Stream> streamOpt = streamService.findById(id);
      if (streamOpt.isEmpty())
        return ResponseEntity.ok(Map.of("code", 404, "message", "Luồng không tồn tại"));
      Stream stream = streamOpt.get();
      stream.setSourceType(updateStreamInput.getSourceType());
      stream.setName(updateStreamInput.getName());
      stream.setSourceUrl(updateStreamInput.getSourceUrl());
      return ResponseEntity.ok(Map.of("code", 204, "message", "Thành công"));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.ok(Map.of("code", 500, "message", e.getMessage(), "error", e));
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteStreamById(@PathVariable(name = "id") Long id) {
    try {
      Optional<Stream> streamOpt = streamService.findById(id);
      if (streamOpt.isEmpty())
        return ResponseEntity.ok(Map.of("code", 404, "message", "Luồng không tồn tại"));
      streamService.deleteById(streamOpt.get().getId());
      return ResponseEntity.ok(Map.of("code", 204, "message", "Thành công"));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.ok(Map.of("code", 500, "message", e.getMessage(), "error", e));
    }
  }

}
