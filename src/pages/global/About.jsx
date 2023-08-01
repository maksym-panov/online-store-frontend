import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ping } from "../../utils/webHelpers";
import { useEffect } from "react";
import iph from "../../utils/infoPagesHelper";

export default () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        ping(user, dispatch);
    }, []);

    return (
        <div style={ iph.auBody }>
            <div style={ iph.auCont }>
                <h1 style={ iph.titleC }>About us</h1>
                <hr />
                <h3 style={ iph.titleA }>Our goal is to be useful</h3>
                <p style={ iph.text }>We believe that things exist to make life easier, more pleasant and kinder. Thats why the search for the right thing should be quick, convenient and enjoyable. We dont just sell household appliances, electronics, jewelry, or wine. We help you find exactly what you need in one place and without unnecessary worries, so that you don't spend your life searching for it, but simply live happily. Raccoon's is a universal answer to any request, the beginning of the search and its final stop, a real assistant. We forever save our customers from unpleasant compromises, fulfill their desires, and allow them to dream big. Through smart search and honest service, we make our customers' lives a little better right now.</p>
                <h3 style={ iph.titleA }>Happiness starts with simple things</h3>
                <p style={ iph.text }>And we help to find these things: we tell people in love how to surprise each other; we motivate athletes to never give up and make faster progress; we give people who are householders the opportunity to create a real comfort. We want you to know what you are looking for and be able to justify your choice. To do this, we shoot video reviews, write articles, and keep track of new products.</p>
                <h3 style={ iph.titleA }>To make dreams come true easily</h3>
                <p style={ iph.text }>We open huge offline stores so that you can come, hold and test your favorite product. We want to provide the best service in the world, so we train our employees not only in the technical part of the business, but also in customer service.</p>
                <h3 style={ iph.titleA }>Convenient delivery</h3>
                <p style={ iph.text }>And of course, any product can be ordered with delivery. We deliver orders in Kyiv within one day, and in Ukraine - the next day. All without prepayment, and if necessary, on credit. You can pay in cash or by bank transfer - whatever you prefer.</p>
                <h3 style={ iph.titleC }>We are waiting for you here!</h3>
            </div>
        </div>
    );
}