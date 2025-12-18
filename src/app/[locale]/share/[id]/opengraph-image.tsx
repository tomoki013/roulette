import { ImageResponse } from "next/og";
import { getRouletteById } from "@/lib/services/rouletteService";
import { Item } from "@/types";
import { ROULETTE_COLORS } from "@/constants/roulette";

export const runtime = "edge";

export const alt = "Roulette Share Image";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Image(props: Props) {
  const params = await props.params;
  const { id } = params;
  const roulette = await getRouletteById(id);

  if (!roulette) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: "#1a202c",
            color: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Roulette Not Found
        </div>
      ),
      { ...size }
    );
  }

  const items = (roulette.items as unknown as Item[]).slice(0, 10); // Limit items for display

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom right, #1a202c, #2d3748)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "50%",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: "bold",
              color: "white",
              marginBottom: 20,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {roulette.title}
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#cbd5e0",
              marginBottom: 40,
            }}
          >
            Spin the wheel and try your luck!
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "40%",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: 20,
            padding: 30,
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 10,
                fontSize: 24,
                color: "white",
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: item.color || ROULETTE_COLORS[index % ROULETTE_COLORS.length],
                  marginRight: 15,
                }}
              />
              <div style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                {item.name}
              </div>
            </div>
          ))}
           {(roulette.items as unknown as Item[]).length > 10 && (
             <div style={{ color: "#a0aec0", fontSize: 20, marginTop: 10 }}>
               + {(roulette.items as unknown as Item[]).length - 10} more...
             </div>
           )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
