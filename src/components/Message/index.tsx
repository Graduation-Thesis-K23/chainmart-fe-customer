import {
  LineOutlined,
  MenuOutlined,
  MessageOutlined,
  SendOutlined,
} from "@ant-design/icons";
import React, { Fragment, useEffect, useState } from "react";
import { Badge, Button, Dropdown, MenuProps } from "antd";
import classNames from "classnames";
import Image from "next/image";
import {
  receiveMessage,
  sendMessage,
  useAppDispatch,
  useAppSelector,
} from "~/redux";
import { chatbotSocket } from "~/apis/socket.io-instance";

import styles from "./Message.module.scss";
import logoSquare from "~/assets/images/logo-square.png";
import useTranslate from "~/hooks/useLocales";
import BotMessage from "./BotMessage";

const Message = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [hide, setHide] = useState(true);

  const messages = useAppSelector((state) => state.messages);
  const dispatch = useAppDispatch();

  const messagePlaceholder = useTranslate("message.placeholder");
  const messageLookupOrder = useTranslate("message.lookupOrder");
  const messageSeekingProduct = useTranslate("message.seekingProduct");
  const startMessage = useTranslate("message.startMessage");

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
      chatbotSocket.emit("send", result.payload);
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

  useEffect(() => {
    chatbotSocket.on("receive", (data) => {
      dispatch(receiveMessage(data));
    });

    return () => {
      chatbotSocket.off("receive");
    };
  }, [dispatch]);

  useEffect(() => {
    const messageBox = document.getElementById("message-list");

    if (messageBox) {
      setTimeout(() => {
        messageBox.scrollTop = messageBox.scrollHeight;
      }, 600);
    }
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (hide) {
    return <></>;
  }

  return (
    <div className={styles["message"]}>
      <div className={styles["message__btn"]} onClick={handleOpenChat}>
        <Badge count={1} offset={[5, -5]} color="#2da85c">
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
            <div className={styles["message__box__body__list__chatbot"]}>
              <span
                className={styles["message__box__body__list__chatbot__text"]}
              >
                {startMessage}
              </span>
            </div>
            {messages.data.map((message, index) => {
              if (typeof message !== "string") {
                return (
                  <Fragment key={index}>
                    <BotMessage message={message} />
                  </Fragment>
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
                      {message}
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
