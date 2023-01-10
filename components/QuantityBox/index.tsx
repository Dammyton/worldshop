import React from "react";
import styles from "./QuantityBox.module.css";
interface IProps {
  value: number;
  onValueChange: (newValue: number, productId: number) => void;
  productId: number;
}

const QuantityBox = ({ value, onValueChange, productId }: IProps) => {
  const steps = 1;

  const updateHandler = (e: any, value: any) => {
    const newValue = value <= 0 ? 1 : value;

    onValueChange(newValue, productId);
  };

  return (
    <div className="QuantityBox">
      <div className={styles.QuantityBoxWrapper}>
        <div className={styles.inputGroup}>
          <div className="input-group-prepend">
            <button
              name="decrement"
              className={styles.button}
              onClick={(e: any) => updateHandler(e, value - steps)}
              type="button"
              value={value > 1 ? -1 : 0}
            >
              -
            </button>
          </div>
          <input
            className={`${styles.input} quantity form-control mx-2 text-center`}
            disabled
            min="0"
            type="text"
            value={value || 1}
          />{" "}
          <div className="input-group-append">
            <button
              name="increment"
              className={styles.button}
              onClick={(e: any) => updateHandler(e, value + steps)}
              type="button"
              value={1}
            >
              +
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantityBox;
