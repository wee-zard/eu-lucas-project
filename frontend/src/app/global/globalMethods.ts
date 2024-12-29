/**
 * Adds a ripple component to the provided dom component, when the
 * user clicks on the component.
 * 
 * @param event A fired onClick event, when the user clicked on a component.
 * @param id The unique id of the component which will be used to add an additional component as the ripple.
 */
export const handleClickOnGlobalRippleEffect = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  id: string
) => {
  const imageCard = document.getElementById(id);
  if (imageCard) {
    // Create span element
    let ripple = document.createElement("span");

    // Add ripple class to span
    ripple.classList.add("ripple");

    // Add span to the button
    imageCard.appendChild(ripple);

    // Move the span to a default position
    ripple.style.left = `0px`;
    ripple.style.top = `0px`;

    // Get the position of the span.
    var rect = ripple.getBoundingClientRect();

    // Position the span element
    ripple.style.left = `${event.clientX - rect.x}px`;
    ripple.style.top = `${event.clientY - rect.y}px`;

    // Remove span after 0.75sec
    setTimeout(() => {
      ripple.remove();
    }, 750);
  }
};
