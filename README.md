```
   <div className="text-center w-full flex flex-col absolute md:relative items-center justify-center">
          <span className="text-xs sm:text-base mt-7  md:mt-0 tracking-tight">
            {label}
          </span>
        </div>
```

/_ Mobile kecil (HP jadul / layar kecil) _/
@media (max-width: 320px) { ... }

/_ Mobile normal (HP modern) _/
@media (max-width: 480px) { ... }

/_ Phablet & mobile besar _/
@media (max-width: 600px) { ... }

/_ Tablet portrait _/
@media (max-width: 768px) { ... }

/_ Tablet landscape / small laptop _/
@media (max-width: 992px) { ... }

/_ Laptop standar _/
@media (max-width: 1200px) { ... }

/_ Desktop besar / layar 2K _/
@media (max-width: 1400px) { ... }

/_ Ultra wide (opsional) _/
@media (min-width: 1600px) { ... }

MacBook Air 13" → 1440 x 900 (viewport default sekitar 1280px lebar)

MacBook Pro 13" → 2560 x 1600 (viewport default sekitar 1280px)

MacBook Pro 14" → 3024 x 1964 (viewport default sekitar 1512px)

MacBook Pro 16" → 3456 x 2234 (viewport default sekitar 1728px)

```
     {/* Input khusus menggunakan Controller */}
      <Controller
        name="level"
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={field.value}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select skill level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      {errors.level && <p>{errors.level.message}</p>}



              {/* Kolom Kanan - Registrasi & Pembayaran */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Card Informasi Pendaftaran */}
            <div className="bg-white rounded-2xl mb-6">
              <h3 className="text-lg font-semibold mb-4">
                Informasi Pendaftaran
              </h3>
              <div className="space-y-4">
                <div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Nama Lengkap"
                    className="w-full p-2 border rounded"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("phoneNumber")}
                    type="text"
                    placeholder="Nomor Telepon"
                    className="w-full p-2 border rounded"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                {/* Dropdown Level */}
                <div className="relative">
                  <select
                    {...register("level")}
                    className="w-full p-2 border rounded appearance-none"
                  >
                    <option value="">Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="expert">Expert</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                  {errors.level && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.level.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Card Promo */}
            <div className="bg-white rounded-2xl  mb-6">
              <h3 className="text-lg font-semibold mb-4">Kode Promo</h3>
              <input
                type="text"
                placeholder="Masukkan Kode Referral"
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Card Detail Pembayaran */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Detail Pembayaran</h3>
              <div className="flex justify-between mb-4">
                <span>Total Biaya:</span>
                <span className="font-bold">Rp {price}</span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-background-button-rc text-white p-3 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Prosesing..." : "Continue"}
              </button>
            </div>
          </form>
        </div>

```
