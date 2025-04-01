import React, { forwardRef } from "react";
import {
  CardContainer,
  TextContainer,
  Image,
  CardInfo,
  Title,
  Creator,
  Price,
  SkeletonCard,
  SkeletonImage,
  SkeletonText,
  SkeletonPrice,
} from "../styles/contentList.styles";

const ItemCard = forwardRef(({ content }, ref) => {
  if (!content) {
    return (
      <SkeletonCard ref={ref}>
        <SkeletonImage />
        <CardInfo>
          <TextContainer>
            <SkeletonText width="80%" />
            <SkeletonText width="60%" />
          </TextContainer>
          <SkeletonPrice />
        </CardInfo>
      </SkeletonCard>
    );
  }

  const { title, creator, price, imagePath, pricingOption } = content;
  const displayPrice =
    pricingOption === 1
      ? "FREE"
      : pricingOption === 0
      ? `$${price}`
      : "ViewOnly";

  return (
    <CardContainer ref={ref}>
      <Image src={imagePath} alt={title} />
      <CardInfo>
        <TextContainer>
          <Title>{title}</Title>
          <Creator>By: {creator}</Creator>
        </TextContainer>
        <Price>{displayPrice}</Price>
      </CardInfo>
    </CardContainer>
  );
});

export default ItemCard;
