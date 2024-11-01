import * as React from "react";

import { Card, CardContent } from "../../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import { collections, ICollection } from "../collections/collections";

export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-7xl"
    >
      <CarouselContent className="w-full">
        {collections.map((collection: ICollection, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="border-none w-72">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div key={collection.id}>
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="h-64 w-64 object-cover rounded-md"
                    />
                    <div className="font-body flex-col ">
                      <h1 className="text-lg font-bold">
                        #{collection.number}
                      </h1>
                      <h1 className="text-sm">{collection.price} ICP</h1>
                      <p className="mt-4">Mar 11, 2021</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-between bg-white w-full">
        <CarouselNext className="text-white border-none mx-4 px-2 py-1 mt-4" />
        <CarouselPrevious className="text-white border-none mx-4 px-2 py-1 right-0 mt-4" />
      </div>
    </Carousel>
  );
}
