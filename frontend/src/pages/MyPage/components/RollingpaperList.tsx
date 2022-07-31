import React, { Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";

import RollingpaperCard from "@/pages/MyPage/components/RollingpaperCard";
import Paging from "@/components/Paging";

interface ReceivedRollingpaper {
  id: number;
  title: string;
  teamId: number;
  teamName: string;
}

interface RollingpaperList {
  rollingpapers: ReceivedRollingpaper[];
  currentPage: number;
  maxPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const RollingpaperList = ({
  rollingpapers,
  currentPage,
  maxPage,
  setCurrentPage,
}: RollingpaperList) => {
  return (
    <>
      <StyledRollingpaperList>
        {rollingpapers.map(({ title, teamName, id }) => (
          <li key={id}>
            <RollingpaperCard title={title} teamName={teamName} />
          </li>
        ))}
      </StyledRollingpaperList>
      <StyledPaging>
        <Paging
          currentPage={currentPage}
          maxPage={maxPage}
          setCurrentPage={setCurrentPage}
        />
      </StyledPaging>
    </>
  );
};

const StyledRollingpaperList = styled.ul`
  display: flex;
  flex-direction: column;

  margin-top: 16px;
  gap: 8px;
`;

const StyledPaging = styled.div`
  padding: 20px 0 20px 0;
  display: flex;
  justify-content: center;
`;

export default RollingpaperList;