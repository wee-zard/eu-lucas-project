/**
 * Stores the unique identification of html components while storing them
 * together in one util component.
 */
export const IdUtils = {
  /**
   * Get a unique name for the filtered image cards.
   *
   * @param index The index of the image that is rendered in the page.
   * @returns Returns a unique id which can be used to add ripple effect
   * on to the filtered image cards.
   */
  GetFilteredImageCardDivId: (id: number) => `image-card-${id}`,

  /**
   * Get a unique name for the event listeners.
   *
   * @param id The unique id of the {@link QueryComponent}.
   * @returns A unique id which can be used to emit a window event and
   * call the corresponding methods that answers.
   */
  getEventListenerName: (id: number) => `QueryBuilderEventListener_${id}`,

  getTimelineContentById: (id: number) => `StyledTimelineContent-${id}`,
};
