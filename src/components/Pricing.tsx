
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Pricing = () => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <p>Pricing information will be displayed here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
