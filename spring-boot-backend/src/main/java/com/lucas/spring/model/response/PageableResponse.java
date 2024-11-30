//package com.lucas.spring.model.response;
//
//import java.util.ArrayList;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//
//
///**
// * A response type that only gives back a portion of the
// * result query based on the provided page number, and page size.
// */
//@Getter
//@AllArgsConstructor
//public class PageableResponse<T> {
//  /**
//   * The currently active page.
//   */
//  private Integer pageNo;
//
//  /**
//   * The size of the page (this is the pagination).
//   */
//  private Integer pageSize;
//
//  /**
//   * The list of items that is sent back to the requester.
//   */
//  private ArrayList<T> pageItems;
//}
