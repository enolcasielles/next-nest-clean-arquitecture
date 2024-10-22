import { useState } from "react";

import { CustomError } from "@marketplace/domain";

import { Button } from "@/components/ui/button";
import { deleteProductAction } from "../actions/delete-product.action";

interface Props {
  productId: string;
}

export default function DeleteButton({ productId }: Props) {
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteProductAction(productId);
    } catch (e) {
      const error = CustomError.fromError(e as Error);
      alert(error.errors[0]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex space-x-4">
      <Button disabled={loading} onClick={onDelete}>
        Eliminar
      </Button>
    </div>
  );
}
