import { useNotifications } from "@toolpad/core/useNotifications";

export const useAppNotifications = () => {
  // TODO: Finish this part.
  // https://mui.com/toolpad/core/react-use-notifications/#alert-notifications
  // https://mui.com/material-ui/react-alert/
  const notifications = useNotifications();

  notifications.show("Consider yourself notified!", {
    autoHideDuration: 3000,
  });
};
