import styled from 'styled-components';

import Row from '../row/Row';

export const StyledPostList = styled.div`
  height: 500px;
  overflow: scroll;
`;

export const PostPreview = styled(Row)`
  background-color: whitesmoke;
  align-items: center;
  padding: 15px;
  box-shadow: 2px 2px 5px #00000022;
  cursor: pointer;

  &:not(:last-of-type) {
    margin-bottom: 15px;
  }
`;

export const PostThumbnail = styled.img`
  margin-right: 15px;
  max-width: 25%;
  max-height: 75px;
`;
