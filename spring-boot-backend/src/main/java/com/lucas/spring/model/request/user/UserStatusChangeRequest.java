package com.lucas.spring.model.request.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Stores information related to the status changes of the user.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserStatusChangeRequest {
  /**
   * The new status of the user.
   */
  private Long status;
  /**
   * Url to the user's profile picture in url.
   */
  private String imageUrl;
  /**
   * The username or full name of the user.
   */
  private String username;
}
