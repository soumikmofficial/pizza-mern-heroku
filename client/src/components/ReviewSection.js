import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import SingleReview from "./singleReview";

const containerVariants = {
  hidden: {
    x: "100%",
  },
  visible: {
    x: 0,
  },
};

const ReviewSection = ({ productId }) => {
  const { reviews } = useSelector((state) => state.reviews);
  return (
    <Container animate="visible" initial="hidden" variants={containerVariants}>
      <AnimatePresence>
        {reviews.length > 0 ? (
          reviews.map((review) => {
            return (
              <SingleReview review={review} key={review._id}></SingleReview>
            );
          })
        ) : (
          <p className="no-reviews">no reviews</p>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default ReviewSection;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: scroll;
  height: 20rem;
  position: relative;

  .no-reviews,
  .loading {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.4rem;
    color: grey;
    text-transform: capitalize;
  }

  .loading {
    color: white;
  }
`;
