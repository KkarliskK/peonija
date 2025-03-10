<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Pasūtījuma apstiprinājums</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 20px; }
        .order-details { margin-bottom: 30px; }
        table { width: 100%; border-collapse: collapse; }
        table, th, td { border: 1px solid #ddd; }
        th, td { padding: 10px; text-align: left; }
        th { background-color: #f2f2f2; }
        .total { font-weight: bold; text-align: right; margin-top: 20px; }
        .footer { margin-top: 30px; font-size: 12px; color: #777; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Paldies par Jūsu pasūtījumu!</h1>
            <p>Pasūtījums #{{ $order->id }}</p>
        </div>

        <div class="order-details">
            <h2>Pasūtījuma detaļas</h2>
            <p><strong>Vārds:</strong> {{ $order->name }}</p>
            <p><strong>E-pasts:</strong> {{ $order->email }}</p>
            <p><strong>Telefons:</strong> {{ $order->mobile }}</p>
            
            @if($order->address !== 'Uzvaras Bulvāris 1B')
                <p><strong>Piegādes adrese:</strong> {{ $order->address }}</p>
            @else
                <p><strong>Saņemšanas adrese:</strong> Uzvaras Bulvāris 1B</p>
            @endif
            
            <h3>Pasūtītās preces</h3>
            <table>
                <thead>
                    <tr>
                        <th>Produkts</th>
                        <th>Daudzums</th>
                        <th>Cena</th>
                        <th>Kopā</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($order->items as $item)
                        <tr>
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
        
        <div class="footer">
            <p>Ja Jums ir kādi jautājumi, lūdzu, sazinieties ar mūsu klientu apkalpošanas dienestu.</p>
            <p>© {{ date('Y') }} Peonija. Visas tiesības aizsargātas.</p>
        </div>
    </div>
</body>
</html>