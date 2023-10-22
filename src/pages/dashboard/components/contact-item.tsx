import { User } from "@/types";
import Image from "next/image";
import { styled } from "styled-components";

type Props = {
  contact: User;
  handleClick: (contact: User) => void;
};

export const ContactItem = ({ contact, handleClick }: Props) => {
  const { avatarUrl } = contact;
  return (
    <ImageWrapper onClick={() => handleClick(contact)}>
      <Image width={140} height={140} alt="user image" src={avatarUrl} />
    </ImageWrapper>
  );
};

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 95px;
  height: 140px;
  border-radius: 30px;

  box-shadow: 10px 14px 10px 0px rgba(0, 0, 0, 0.45);
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    width: 100px;
    height: 145px;
  }

  > img {
    height: 100%;
  }
`;
