import { ManageUserRowTypes } from "@model/types/ManageUserRowType";
import { styled } from "@mui/material/styles";

type Props = {
  row: ManageUserRowTypes;
};

const ManageUsersProfilePicture = ({ row }: Props) => {
  const getProfilePicture = () => {
    return row.profilePicture.length === 0 ? (
      <></>
    ) : (
      <StyledImage src={row.profilePicture} alt="Profile picture of the user" />
    );
  };

  return (
    <StyledImageHolder>
      <div className="flex-container">{getProfilePicture()}</div>
      <div>
        <div>{row.userName}</div>
        <div>{row.email}</div>
      </div>
    </StyledImageHolder>
  );
};

export default ManageUsersProfilePicture;

export const dataGridUserTableRowHeight = 100;

const dataGridTableRowImageHeight = dataGridUserTableRowHeight * 0.75;

const StyledImageHolder = styled("div")({
  display: "flex",
  gap: 16,
  height: dataGridUserTableRowHeight,
});

const StyledImage = styled("img")({
  borderRadius: "50%",
  height: dataGridTableRowImageHeight,
  width: dataGridTableRowImageHeight,
});
