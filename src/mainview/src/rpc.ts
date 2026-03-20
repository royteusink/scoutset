import { Electroview } from "electrobun/view";
import type { ScoutsetRPC } from "../../shared/rpc-types";

const rpc = Electroview.defineRPC<ScoutsetRPC>({
  handlers: {
    requests: {},
    messages: {},
  },
});

const view = new Electroview({ rpc });

export { rpc, view };
