```
     {/* Card Waktu Pertandingan */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Waktu Pertandingan</h3>
            <div className="space-y-2">
              {times.map((time, index) => (
                <p key={index}>{time}</p>
              ))}
            </div>
          </div>

```
