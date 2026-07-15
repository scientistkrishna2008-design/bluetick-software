import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";

interface PaymentDetails {
  plan: string;
  total: number;
  paid: number;
  pending: number;
  history: { date: string; amount: number; invoiceId: string }[];
}

export function PaymentsCard({ details }: { details: PaymentDetails }) {
  const percentPaid = (details.paid / details.total) * 100;

  return (
    <Card className="bg-surface/50 border-border h-full">
      <CardHeader className="pb-4 border-b border-border/50">
        <CardTitle className="text-xl font-bold">Payments</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Selected Plan</p>
            <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-growbroo-400 to-green-600">{details.plan}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total</p>
            <p className="font-bold text-white">₹{details.total.toLocaleString()}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Paid: <span className="text-white font-bold">₹{details.paid.toLocaleString()}</span></span>
            <span className="text-gray-400">Pending: <span className="text-growbroo-500 font-bold">₹{details.pending.toLocaleString()}</span></span>
          </div>
          <div className="h-2 w-full bg-background rounded-full overflow-hidden">
            <div className="h-full bg-growbroo-500" style={{ width: `${percentPaid}%` }} />
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <h4 className="text-xs text-gray-500 uppercase tracking-wider font-bold">Payment History</h4>
          {details.history.map((hist, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-surface/30 border border-border/50">
              <div>
                <p className="text-sm font-medium text-white">₹{hist.amount.toLocaleString()}</p>
                <p className="text-xs text-gray-500">{hist.date}</p>
              </div>
              <Button variant="ghost" className="text-xs text-growbroo-500 hover:text-growbroo-400 p-0 h-auto flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                {hist.invoiceId}
              </Button>
            </div>
          ))}
        </div>

        {details.pending > 0 && (
          <Button variant="premium" className="w-full">
            Pay Remaining Balance
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
