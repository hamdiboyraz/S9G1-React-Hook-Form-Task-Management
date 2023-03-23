import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      people: [],
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          type="text"
          {...register("title", {
            required: "Task başlığı yazmalısınız.",
            minLength: {
              value: 3,
              message: "En az 3 Karakter giriniz.",
            },
          })}
        />
        {errors.title && <div>{errors.title.message}</div>}
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value: 10,
              message: "En az 10 Karakter giriniz.",
            },
          })}
        ></textarea>
        {errors.description && <div>{errors.description.message}</div>}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                value={p}
                {...register("people", {
                  validate: {
                    min: (v) => v.length > 0 || "En az 1 kişi seçmelisin.",
                    max: (v) => v.length <= 3 || "En fazla 3 kişi seçebilirsin",
                  },
                  // validate: (value) =>
                  //   value.length > 0
                  //     ? value.length <= 3 || "En fazla 3 kisi seçebilirsin"
                  //     : "En az 1 kişi seçmelisin.",
                })}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && <div>{errors.people.message}</div>}
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}
