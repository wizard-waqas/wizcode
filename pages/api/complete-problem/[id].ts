import fs from "fs";
import path from "path";

const PROBLEMS_FILE = path.join(process.cwd(), "public", "problems.json");

export default async function handler(req: any, res: any) {
  if (req.method === "PUT") {
    const { id } = req.query;

    try {
      // Read the current problems from the file
      const data = await fs.promises.readFile(PROBLEMS_FILE, "utf8");
      const problems = JSON.parse(data);

      // Find the problem and update its completion status
      const problemIndex = problems.findIndex((p: any) => p.id === parseInt(id));
      if (problemIndex === -1) {
        return res.status(404).json({ error: "Problem not found" });
      }

      problems[problemIndex].completed = true;

      await fs.promises.writeFile(PROBLEMS_FILE, JSON.stringify(problems, null, 2));

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error updating problem status:", error);
      res.status(500).json({ error: "Failed to update problem status" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}