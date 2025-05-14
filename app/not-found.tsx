"use client";

export default function NotFound() {
  return (
    <main className="flex justify-center items-center bg-white">
      <div className="container mx-auto pr-30 pl-30 md:pr-40 md:pl-20 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        <div className="flex items-center justify-center">
        </div>
        <div className="flex flex-col justify-center p-10">
          <p className="font-tahoma text-4xl font-bold text-brand-special-300 mb-4 pl-5 pr-5">
            OOPS! We cannot recognize the link you opened.
          </p>
          <p className="font-roboto text-2xl font-bold text-brand-special-100 p-5">
            Seems you got lost, but don't worry! You can use the navigational bar above to navigate safely through our website. 😊
          </p>
        </div>
      </div>
    </main>
  );
}