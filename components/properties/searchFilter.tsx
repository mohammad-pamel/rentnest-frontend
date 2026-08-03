import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchFilter() {
  return (
    <div className="mb-8 rounded-lg border p-6">
      <div className="grid gap-4 md:grid-cols-4">

        <Input
          placeholder="Search location..."
        />

        <Input
          type="number"
          placeholder="Min Price"
        />

        <Input
          type="number"
          placeholder="Max Price"
        />

        <Button>
          Search
        </Button>

      </div>
    </div>
  );
}