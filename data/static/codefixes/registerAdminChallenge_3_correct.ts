/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.3.0
*    Source File: registerAdminChallenge_3_correct.ts
*    
*    Copyrights:
*      copyright © by bjoern kimminich & the owasp juice shop contributors
*      copyright (c) 2014-2021 bjoern kimminich
*      copyright (c) 2014-2022 bjoern kimminich & the owasp juice shop contributors
*    
*    Licenses:
*      MIT License
*      SPDXId: MIT
*    
*    Auto-attribution by Threatrix, Inc.
*    
*    ------ END LICENSE ATTRIBUTION ------
*/
/* Generated API endpoints */
  finale.initialize({ app, sequelize })

  const autoModels = [
    { name: 'User', exclude: ['password', 'totpSecret'], model: UserModel },
    { name: 'Product', exclude: [], model: ProductModel },
    { name: 'Feedback', exclude: [], model: FeedbackModel },
    { name: 'BasketItem', exclude: [], model: BasketItemModel },
    { name: 'Challenge', exclude: [], model: ChallengeModel },
    { name: 'Complaint', exclude: [], model: ComplaintModel },
    { name: 'Recycle', exclude: [], model: RecycleModel },
    { name: 'SecurityQuestion', exclude: [], model: SecurityQuestionModel },
    { name: 'SecurityAnswer', exclude: [], model: SecurityAnswerModel },
    { name: 'Address', exclude: [], model: AddressModel },
    { name: 'PrivacyRequest', exclude: [], model: PrivacyRequestModel },
    { name: 'Card', exclude: [], model: CardModel },
    { name: 'Quantity', exclude: [], model: QuantityModel }
  ]

  for (const { name, exclude, model } of autoModels) {
    const resource = finale.resource({
      model,
      endpoints: [`/api/${name}s`, `/api/${name}s/:id`],
      excludeAttributes: exclude,
      pagination: false
    })

    // create a wallet when a new user is registered using API
    if (name === 'User') {
      resource.create.send.before((req: Request, res: Response, context: { instance: { id: any }, continue: any }) => {
        WalletModel.create({ UserId: context.instance.id }).catch((err: unknown) => {
          console.log(err)
        })
        context.instance.role = 'customer'
        return context.continue
      })
    }