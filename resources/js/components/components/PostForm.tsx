import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addPost } from "../action/post";

const PostForm = ({ addPost }) => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        date: 0,
        offsetY: 0,
    });
    const { title, content, date, offsetY } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        // console.log(props);

        e.preventDefault();
        addPost(formData);
        setFormData({ title: "", content: "", date: 0, offsetY: 0 });
    };

    return (
        <Fragment>
            <div className="mb-5">
                <form
                    onSubmit={(e) => {
                        onSubmit(e);
                    }}
                >
                    <div className="">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">
                                account_circle
                            </i>
                            <input
                                id="icon_prefix"
                                type="text"
                                className="validate"
                                name="title"
                                value={title}
                                onChange={(e) => onChange(e)}
                            />
                            <label htmlFor="icon_prefix">Enter your Name</label>
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">sms</i>

                            <textarea
                                id="textarea1"
                                className="materialize-textarea"
                                name="content"
                                value={content}
                                onChange={(e) => onChange(e)}
                            ></textarea>

                            <label htmlFor="textarea1">Enter a Post...</label>
                        </div>
                        <div>
                            <input
                                id="icon_prefix"
                                type="number"
                                className="validate"
                                name="date"
                                value={date}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                        <div>
                            <input
                                id="icon_prefix"
                                type="number"
                                className="validate"
                                name="offsetY"
                                value={offsetY}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                    </div>
                    <button
                        className="btn waves-effect waves-light ml-2"
                        type="submit"
                        name="action"
                    >
                        Submit
                        <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>
        </Fragment>
    );
};
PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
