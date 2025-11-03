"use client";

import React from "react";
import { useFormikContext } from "formik";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const StepProductDetails = ({ formik }: any) => {
  const { values, setFieldValue } = formik || useFormikContext();

  return (
    <>
      <div>
        <Label htmlFor="description" className="font-medium">
          Product Description
        </Label>
        <Textarea
          id="description"
          placeholder="Enter detailed product description"
          rows={4}
          value={values.description || ""}
          onChange={(e) => setFieldValue("description", e.target.value)}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="specification" className="font-medium">
          Product Specification
        </Label>
        <Textarea
          id="specification"
          placeholder="Enter product specifications"
          rows={4}
          value={values.specification || ""}
          onChange={(e) => setFieldValue("specification", e.target.value)}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="refund_policy" className="font-medium">
          Refund Policy
        </Label>
        <Textarea
          id="refund_policy"
          placeholder="Enter refund policy details"
          rows={4}
          value={values.refund_policy || ""}
          onChange={(e) => setFieldValue("refund_policy", e.target.value)}
          className="mt-2"
        />
      </div>
    </>
  );
};

export default StepProductDetails;
