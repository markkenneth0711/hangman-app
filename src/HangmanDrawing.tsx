const HEAD = (
  <div
    style={{
      width: "40px",
      height: "40px",
      borderRadius: "100%",
      border: "6px solid black",
      position: "absolute",
      top: "40px",
      left: "37.8%",
      animation: "fadeIn 0.1s ease-in"
    }}
  />
)

const BODY = (
  <div
    style={{
      width: "6px",
      height: "80px",
      background: "black",
      position: "absolute",
      top: "86px",
      left: "49.1%",
      animation: "fadeIn 0.3s ease-in"
    }}
  />
)

const RIGHT_ARM = (
  <div
    style={{
      width: "60px",
      height: "6px",
      background: "black",
      position: "absolute",
      top: "107px",
      left: "50%",
      transformOrigin: "left center",
      transform: "rotate(35deg)",
      animation: "fadeIn 0.3s ease-in"
    }}
  />
)

const LEFT_ARM = (
  <div
    style={{
      width: "60px",
      height: "6px",
      background: "black",
      position: "absolute",
      top: "107px",
      right: "50%",
      transformOrigin: "right center",
      transform: "rotate(-35deg)",
      animation: "fadeIn 0.3s ease-in"
    }}
  />
)

const RIGHT_LEG = (
  <div
    style={{
      width: "60px",
      height: "6px",
      background: "black",
      position: "absolute",
      top: "159px",
      left: "50%",
      transformOrigin: "left center",
      transform: "rotate(50deg)",
      animation: "fadeIn 0.3s ease-in"
    }}
  />
)

const LEFT_LEG = (
  <div
    style={{
      width: "60px",
      height: "6px",
      background: "black",
      position: "absolute",
      top: "159px",
      right: "50%",
      transformOrigin: "right center",
      transform: "rotate(-50deg)",
      animation: "fadeIn 0.3s ease-in"
    }}
  />
)

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]

type HangmanDrawingProps = {
  numberOfGuesses: number
}

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  return (
    <div style={{ position: "relative", width: "200px", height: "300px" }}>
      {/* Gallows structure */}
      <div style={{ height: "8px", width: "200px", background: "black", position: "absolute", bottom: 0, left: "30%", transform: "translateX(-50%)" }} />
      <div style={{ height: "292px", width: "8px", background: "black", position: "absolute", bottom: "8px", left: "20px" }} />
      <div style={{ height: "8px", width: "83px", background: "black", position: "absolute", top: 0, left: "20px" }} />
      <div style={{ height: "40px", width: "6px", background: "black", position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)" }} />
      
      {/* Body parts */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
        {BODY_PARTS.slice(0, numberOfGuesses)}
      </div>
    </div>
  )
}