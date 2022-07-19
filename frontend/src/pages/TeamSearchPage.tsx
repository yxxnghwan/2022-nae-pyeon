import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import SearchInput from "@/components/SearchInput";
import TeamCard from "@/components/TeamCard";
import RequireLogin from "@/components/RequireLogin";

import appClient from "@/api";

interface TeamType {
  id: number;
  name: string;
  description: string;
  emoji: string;
  color: string;
}

const TeamSearch = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: teamList,
  } = useQuery<TeamType[]>(["total-teams"], () =>
    appClient.get(`/teams`).then((response) => response.data)
  );

  const handleSearchClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // 키워드로 api call 하기
    e.preventDefault();
    console.log(searchKeyword);
  };

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setSearchKeyword(e.target.value);
  };

  const handleTeamCardClick = (id: number) => {
    navigate(`/team/${id}`);
  };

  if (isLoading) {
    return <div>로딩 중</div>;
  }
  if (isError || !teamList) {
    return <div>에러</div>;
  }

  return (
    <RequireLogin>
      <>
        <StyledSearch>
          <SearchInput
            onClick={handleSearchClick}
            onChange={handleSearchChange}
          />
        </StyledSearch>
        <StyledTeamList>
          {teamList.map((team) => (
            <TeamCard
              key={team.id}
              onClick={() => {
                handleTeamCardClick(team.id);
              }}
            >
              {team.name}
            </TeamCard>
          ))}
        </StyledTeamList>
      </>
    </RequireLogin>
  );
};

const StyledSearch = styled.div`
  padding: 20px;
`;

const StyledTeamList = styled.ul`
  display: flex;
  flex-direction: column;

  height: 70vh;
  padding: 20px;

  gap: 24px;

  overflow: scroll;
`;

export default TeamSearch;