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

            {/* Card Promo */}
            <div className="bg-white mb-2 mt-4">
              <h3 className="text-lg font-semibold mb-4">Kode Promo</h3>
              <div className="flex gap-4">
                <input
                  {...register("promoCode")}
                  type="text"
                  placeholder="TEN87"
                  className="w-full p-1 border rounded"
                />
                <Button
                  type="button"
                  // onClick={""}
                  className="bg-white text-black border border-[#174038] p-0 w-32 h-auto hover:bg-gray-100"
                  // disabled={""}
                >
                  Use
                  {/* {isApplyingPromo ? "Applying..." : "Use"} */}
                </Button>
              </div>
              {/* {promoApplied && (
                <p className="text-green-500 text-sm mt-1">
                  Promo code applied successfully!
                </p>
              )}
              {promoError && (
                <p className="text-red-500 text-sm mt-1">{promoError}</p>
              )} */}
            </div>
```

```

```
