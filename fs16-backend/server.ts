import app from "./index";
import { PORT } from "./constants/server";

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
