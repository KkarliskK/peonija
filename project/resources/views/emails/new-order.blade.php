<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Jauns pasūtījums</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { margin-bottom: 20px; }
        .order-details { margin-bottom: 30px; }
        .customer-info { margin-bottom: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #007bff; }
        table { width: 100%; border-collapse: collapse; }
        table, th, td { border: 1px solid #ddd; }
        th, td { padding: 10px; text-align: left; }
        th { background-color: #f2f2f2; }
        .total { font-weight: bold; text-align: right; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Jauns pasūtījums saņemts</h1>
            <p>Pasūtījums #{{ $order->id }} - {{ $order->created_at->format('d.m.Y, H:i') }}</p>
        </div>

        <div class="customer-info">
            <h2>Klienta informācija</h2>
            <p><strong>Vārds:</strong> {{ $order->name }}</p>
            <p><strong>E-pasts:</strong> {{ $order->email }}</p>
            <p><strong>Telefons:</strong> {{ $order->mobile }}</p>
            
            @if($order->address !== 'Uzvaras Bulvāris 1B')
                <p><strong>Piegādes adrese:</strong> {{ $order->address }}</p>
                <p><strong>Piegādes veids:</strong> Piegāde</p>
            @else
                <p><strong>Piegādes veids:</strong> Saņemšana veikalā (Uzvaras Bulvāris 1B)</p>
            @endif
        </div>

        <div class="order-details">
            <h2>Pasūtījuma detaļas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Produkta ID</th>
                        <th>Produkts</th>
                        <th>Daudzums</th>
                        <th>Cena</th>
                        <th>Kopā</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($order->items as $item)
                        <tr>
                            <td>{{ $item->product_id }}</td>
                            <td>{{ $item->product->name ?? 'Produkts' }}</td>
                            <td>{{ $item->quantity }}</td>
                            <td>€{{ number_format($item->price, 2) }}</td>
                            <td>€{{ number_format($item->price * $item->quantity, 2) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            
            @if($order->delivery_fee > 0)
                <p><strong>Piegādes maksa:</strong> €{{ number_format($order->delivery_fee, 2) }}</p>
            @endif
            
            @if($order->discount > 0)
                <p><strong>Atlaide:</strong> -€{{ number_format($order->discount, 2) }}</p>
            @endif
            
            <div class="total">
                <p>Kopā: €{{ number_format($order->total_price, 2) }}</p>
            </div>
        </div>
    </div>
</body>
</html>