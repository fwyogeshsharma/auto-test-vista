
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Organisation = () => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Organisation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <p>Organisation management functionality will be implemented here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
