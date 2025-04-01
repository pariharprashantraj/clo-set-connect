import styled from "styled-components";

export const ContentListContainer = styled.div`
  display: grid;
  padding: 24px;
  background-color: #333;
  width: 100%;
  justify-items: center;
  gap: 24px;
  /* Default: 4 columns */
  grid-template-columns: repeat(4, 1fr);

  /* Below 1200px: 3 columns */
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  /* Below 768px: 2 columns */
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Below 480px: 1 column */
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const CardContainer = styled.div`
  width: 300px;
  border-radius: 8px;
  overflow: hidden;
  color: #fff;
`;

export const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

export const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`;

export const Creator = styled.p`
  font-size: 14px;
  color: #bbb;
  margin: 4px 0 0;
`;

export const Price = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #ffcc00;
`;

export const SkeletonCard = styled.div`
  width: 300px;
  height: 400px;
  background: #444;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
`;

export const SkeletonImage = styled.div`
  width: 100%;
  height: 400px;
  background: #555;
  border-radius: 8px;
`;

export const SkeletonText = styled.div`
  width: ${(props) => props.width || "100%"};
  height: 16px;
  background: #666;
  border-radius: 4px;
`;

export const SkeletonPrice = styled(SkeletonText)`
  width: 50%;
  height: 20px;
`;
