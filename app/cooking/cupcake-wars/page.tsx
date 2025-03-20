"use client";

import React from "react";
import { Header } from "../../../components/header";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Wrench } from "lucide-react";

export default function CupcakeWarsPage() {
  return (
    <>
      <Header showBackButton={true} title="CUPCAKE WARS" />
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Page Under Construction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <Wrench className="h-16 w-16 text-gray-500 mb-4" />
                <p className="mb-4">
                  This page is currently under development. Please check back soon!
                </p>
                <Button onClick={() => window.history.back()}>
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
