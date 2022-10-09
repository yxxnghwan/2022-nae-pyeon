import styled from "@emotion/styled";

import EmptyRollingpaperList from "@/components/EmptyRollingpaperList";
import RollingpaperListItem from "@/components/RollinpaperListItem";

import useReadReceivedRollingpapers from "@/pages/MyPage/hooks/useReadReceivedRollingpapers";

import SectionHeader from "@/pages/MainPage/components/SectionHeader";

const ReceivedRollingpapersSection = () => {
  const { data: receivedRollingpapers, isLoading: isLoadingRollingpapers } =
    useReadReceivedRollingpapers();

  return (
    <section>
      <SectionHeader
        title="나의 롤링페이퍼"
        count={receivedRollingpapers?.totalCount}
        moreLink="/mypage"
      />
      <StyledRollingpaperList>
        {receivedRollingpapers?.rollingpapers.length === 0 ? (
          <EmptyRollingpaperList />
        ) : (
          receivedRollingpapers?.rollingpapers.map(
            ({ title, teamId, id, teamName }) => (
              <RollingpaperListItem
                key={id}
                title={title}
                teamId={teamId}
                id={id}
                teamName={teamName}
              />
            )
          )
        )}
      </StyledRollingpaperList>
    </section>
  );
};

const StyledRollingpaperList = styled.ul`
  display: flex;
  flex-direction: column;

  gap: 8px;

  padding: 10px;
  margin-bottom: 20px;

  height: 460px;
`;

export default ReceivedRollingpapersSection;
