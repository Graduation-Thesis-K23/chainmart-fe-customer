import {
  LineOutlined,
  MenuOutlined,
  MessageOutlined,
  SendOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Badge, Button, Dropdown, MenuProps } from "antd";
import classNames from "classnames";
import Image from "next/image";
import { sendMessage, useAppDispatch, useAppSelector } from "~/redux";

import styles from "./Message.module.scss";
import logoSquare from "~/assets/images/logo-square.png";
import useTranslate from "~/hooks/useLocales";

const Message = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const messages = useAppSelector((state) => state.messages);
  const dispatch = useAppDispatch();

  const messagePlaceholder = useTranslate("message.placeholder");
  const messageLookupOrder = useTranslate("message.lookupOrder");
  const messageBuyingGuide = useTranslate("message.buyingGuide");
  const messageSeekingProduct = useTranslate("message.seekingProduct");

  const handleMinimizeChat = () => {
    setIsOpen(false);
  };

  const handleOpenChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (mess: string) => {
    if (!mess) return;

    const result = await dispatch(sendMessage(mess));

    if (sendMessage.fulfilled.match(result)) {
      const messageBox = document.getElementById("message-list");

      if (messageBox) {
        messageBox.scrollTop = messageBox.scrollHeight;
      }
    }
    setMessage("");
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(message);
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <p
          className={styles["message__item"]}
          onClick={() => handleSendMessage(messageLookupOrder)}
        >
          {messageLookupOrder}
        </p>
      ),
    },
    {
      key: "2",
      label: (
        <p
          className={styles["message__item"]}
          onClick={() => handleSendMessage(messageBuyingGuide)}
        >
          {messageBuyingGuide}
        </p>
      ),
    },
    {
      key: "3",
      label: (
        <p
          className={styles["message__item"]}
          onClick={() => handleSendMessage(messageSeekingProduct)}
        >
          {messageSeekingProduct}
        </p>
      ),
    },
  ];

  return (
    <div className={styles["message"]}>
      <div className={styles["message__btn"]} onClick={handleOpenChat}>
        <Badge count={5} offset={[5, -5]} color="#2da85c">
          <MessageOutlined className={styles["message__icon"]} />
        </Badge>
      </div>
      <div
        className={classNames(styles["message__box"], {
          [styles["message__box--open"]]: isOpen,
        })}
      >
        <div className={styles["message__box__header"]}>
          <div className={styles["message__box__header__left"]}>
            <Image
              className={styles["message__box__header__left__logo"]}
              src={logoSquare}
              height={36}
              alt="logo"
            />
            <p className={styles["message__box__header__left__text"]}>
              Chainmart Vietnam
            </p>
          </div>
          <div className={styles["message__box__header__minimize"]}>
            <span onClick={handleMinimizeChat}>
              <LineOutlined />
            </span>
          </div>
        </div>
        <div className={styles["message__box__body"]}>
          <div className={styles["message__box__body__list"]} id="message-list">
            {messages.data.map((message, index) => {
              if (message.sender === "chatbot") {
                return (
                  <div
                    key={index}
                    className={styles["message__box__body__list__chatbot"]}
                  >
                    <span
                      className={
                        styles["message__box__body__list__chatbot__text"]
                      }
                    >
                      {message.content}
                    </span>
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    className={styles["message__box__body__list__anonymous"]}
                  >
                    <span></span>
                    <span
                      className={
                        styles["message__box__body__list__anonymous__text"]
                      }
                    >
                      {message.content}
                    </span>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className={styles["message__box__input"]}>
          <input
            className={styles["message__box__input__element"]}
            type="text"
            placeholder={messagePlaceholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => handleEnterPress(e)}
          />
          {message ? (
            <Button
              className={styles["message__box__input__btn"]}
              icon={<SendOutlined />}
              shape="circle"
              onClick={() => handleSendMessage(message)}
            />
          ) : (
            <Dropdown
              menu={{ items }}
              placement="topRight"
              arrow
              trigger={["click"]}
              getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
              dropdownRender={(menu) => (
                <div
                  style={{
                    width: 325,
                  }}
                >
                  {React.cloneElement(menu as React.ReactElement)}
                </div>
              )}
            >
              <Button
                className={styles["message__box__input__btn"]}
                icon={<MenuOutlined />}
                shape="circle"
              />
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
