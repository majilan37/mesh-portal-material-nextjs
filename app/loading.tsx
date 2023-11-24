import Loader from "@/components/Loader";
import "ldrs/tailChase";

function Loading() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Loader />
    </div>
  );
}

export default Loading;
