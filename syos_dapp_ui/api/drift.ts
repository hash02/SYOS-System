export default function handler(req: any, res: any) {
  res.status(200).json({
    data: [
      { time: "16:00", value: 0.15 },
      { time: "16:30", value: 0.31 },
      { time: "17:00", value: 0.27 },
    ],
  });
}
